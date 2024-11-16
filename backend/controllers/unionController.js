const { ethers } = require("ethers");
const config = require("../lib/config");
const { predictProxyAddress } = require("../helpers/contract");
const {
  uploadUnionMetadata,
  getUnionMetadata,
  listAllUnion,
} = require("../helpers/storage");

const Union = require("../models/Union");
const { sendPushNotification } = require("./notificationController");
const {
  createGroupChat,
  joinGroupChat,
  leaveGroupChat,
} = require("./chatController");

const getUnion = async (req, res) => {
  try {
    const { chainId, address } = req.params;

    const currentChain = config.chains.find(
      (chain) => chain.chainId === Number(chainId)
    );

    if (!currentChain) {
      throw new Error("Invalid chainId");
    }

    const unionMetadata = await getUnionMetadata(chainId, address);

    res.json({
      success: true,
      metadata: unionMetadata,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const getAllUnion = async (req, res) => {
  try {
    const { chainId } = req.params;

    const currentChain = config.chains.find(
      (chain) => chain.chainId === Number(chainId)
    );

    if (!currentChain) {
      throw new Error("Invalid chainId");
    }

    const unionResponse = await listAllUnion(chainId);

    const allUnions = unionResponse.map((union) => {
      return union.name.split(".json")[0];
    });

    res.json({
      success: true,
      unions: allUnions,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const createNewUnion = async (req, res) => {
  try {
    const { chainId } = req.params;

    const { title, description, image, admin } = req.body;

    if (!title || !description || !admin) {
      throw new Error("Title and description are required");
    }

    const { type, initializer } = req.body;

    const currentChain = config.chains.find(
      (chain) => chain.chainId === Number(chainId)
    );

    if (!currentChain) {
      throw new Error("Invalid chainId");
    }

    const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);

    const factoryContract = new ethers.Contract(
      currentChain.deployments.UnionProxyFactory.address,
      currentChain.deployments.UnionProxyFactory.abi,
      provider
    );

    let singleton = null;

    switch (type) {
      case "conviction":
        singleton = currentChain.deployments.ConvictionUnion.address;
        break;
      case "equal":
        singleton = currentChain.deployments.EqualUnion.address;
        break;
      case "nft":
        singleton = currentChain.deployments.NFTUnion.address;
        break;
      case "traditional":
        singleton = currentChain.deployments.TraditionalUnion.address;
        break;
      case "quadratic":
        singleton = currentChain.deployments.QuadraticUnion.address;
        break;
      default:
        throw new Error("Invalid union type");
    }

    const salt = ethers.utils.randomBytes(32);

    const tx = factoryContract.interface.encodeFunctionData(
      "createProxyWithNonce",
      [singleton, initializer, ethers.utils.hexlify(salt)]
    );

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const txResponse = await wallet.sendTransaction({
      to: currentChain.deployments.UnionProxyFactory.address,
      data: tx,
      value: 0,
      gasLimit: 2000000,
    });

    await txResponse.wait();

    const proxyAddress = await predictProxyAddress(
      currentChain,
      singleton,
      initializer,
      ethers.utils.hexlify(salt)
    );

    const unionMetadata = {
      title,
      description,
      image,
      admin,
      type,
      proxyAddress,
    };

    const chatId = await createGroupChat(req, res);

    await Union.create({
      proxyAddress,
      chainId,
      members: [],
      chatId,
    });

    await uploadUnionMetadata(chainId, proxyAddress, unionMetadata);

    req.body.title = "New Union Created: " + title;
    req.body.chainId = chainId;
    req.body.cta = `/union/${proxyAddress}`;

    await sendPushNotification(req, res);

    // req.body.title = "New Group Chat Created";
    // req.body.description = `A group chat has been created for ${title}`;
    // await sendPushNotification(req, res);

    res.json({
      success: true,
      proxyAddress,
      metadata: unionMetadata,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const addMemberToUnion = async (req, res) => {
  try {
    const { chainId, address } = req.params;

    if (!chainId || !address) {
      throw new Error("ChainId and address are required");
    }

    const { member } = req.body;

    if (!member) {
      throw new Error("Member address is required");
    }

    const currentChain = config.chains.find(
      (chain) => chain.chainId === Number(chainId)
    );

    if (!currentChain) {
      throw new Error("Invalid chainId");
    }

    const union = await Union.findOne({ chainId, proxyAddress: address });

    if (!union) {
      throw new Error("Union not found");
    }

    if (union.members.includes(member)) {
      throw new Error("Member already exists");
    }

    union.members.push(member);

    req.body.title = "New Member Joined";
    req.body.description = `${member} has joined the Union: ${address}`;
    req.body.chainId = chainId;
    req.body.cta = `/union/${address}`;

    await sendPushNotification(req, res);

    req.chatId = union.chatId;
    req.address = member;

    await joinGroupChat(req, res);

    await union.save();

    res.json({
      success: true,
      members: union.members,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const removeMemberFromUnion = async (req, res) => {
  try {
    const { chainId, address } = req.params;

    if (!chainId || !address) {
      throw new Error("ChainId and address are required");
    }

    const { member } = req.body;

    if (!member) {
      throw new Error("Member address is required");
    }

    const currentChain = config.chains.find(
      (chain) => chain.chainId === Number(chainId)
    );

    if (!currentChain) {
      throw new Error("Invalid chainId");
    }

    const union = await Union.findOne({ chainId, proxyAddress: address });

    if (!union) {
      throw new Error("Union not found");
    }

    if (!union.members.includes(member)) {
      throw new Error("Member does not exist");
    }

    union.members = union.members.filter((m) => m !== member);

    await union.save();

    req.body.title = "Member Left Union";
    req.body.description = `${member} has left the Union: ${address}`;
    req.body.chainId = chainId;
    req.body.cta = `/union/${address}`;

    await sendPushNotification(req, res);

    req.chatId = union.chatId;
    req.address = member;

    await leaveGroupChat(req, res);

    res.json({
      success: true,
      members: union.members,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const getUnionMembers = async (req, res) => {
  try {
    const { chainId, address } = req.params;

    if (!chainId || !address) {
      throw new Error("ChainId and address are required");
    }

    const currentChain = config.chains.find(
      (chain) => chain.chainId === Number(chainId)
    );

    if (!currentChain) {
      throw new Error("Invalid chainId");
    }

    const union = await Union.findOne({ chainId, proxyAddress: address });

    if (!union) {
      throw new Error("Union not found");
    }

    res.json({
      success: true,
      members: union.members,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const getUnionChatId = async (req, res) => {
  try {
    const { chainId, address } = req.params;

    if (!chainId || !address) {
      throw new Error("ChainId and address are required");
    }

    const union = await Union.findOne({ chainId, proxyAddress: address });

    if (!union) {
      throw new Error("Union not found");
    }

    res.json({
      success: true,
      chatId: union.chatId,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getUnion,
  getAllUnion,
  createNewUnion,
  addMemberToUnion,
  removeMemberFromUnion,
  getUnionMembers,
  getUnionChatId,
};
