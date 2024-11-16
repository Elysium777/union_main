const { ethers } = require("ethers");
const config = require("../lib/config");
const { v4: uuidv4 } = require("uuid");
const {
  uploadProposalMetadata,
  getProposalMetadata,
} = require("../helpers/storage");
const { sendPushNotification } = require("./notificationController");
const { getSummary } = require("../helpers/ai");

const getProposal = async (req, res) => {
  try {
    const { chainId, address, proposalId } = req.params;

    const currentChain = config.chains.find(
      (chain) => chain.chainId === Number(chainId)
    );

    if (!currentChain) {
      throw new Error("Invalid chainId");
    }

    const dao = currentChain.DAOs.find((dao) => dao.address === address);

    if (!dao) {
      throw new Error("DAO not found");
    }

    const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);

    const DAO = new ethers.Contract(
      dao.address,
      currentChain.deployments.DAO.abi,
      provider
    );

    const proposal = await DAO.proposals(proposalId);

    const proposalMetadata = await getProposalMetadata(proposal.ipfsHash);

    res.json({
      success: true,
      proposal: {
        id: Number(proposal.id),
        address: dao.address,
        proposer: proposal.proposer,
        startBlock: Number(proposal.startBlock),
        endBlock: Number(proposal.endBlock),
        forVotes: proposal.forVotes.toString(),
        againstVotes: proposal.againstVotes.toString(),
        abstainVotes: proposal.abstainVotes.toString(),
        metadata: proposalMetadata,
      },
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const getAllProposals = async (req, res) => {
  try {
    const { chainId, address } = req.params;

    const currentChain = config.chains.find(
      (chain) => chain.chainId === Number(chainId)
    );

    if (!currentChain) {
      throw new Error("Invalid chainId");
    }

    const dao = currentChain.DAOs.find((dao) => dao.address === address);

    if (!dao) {
      throw new Error("DAO not found");
    }

    const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);

    const DAO = new ethers.Contract(
      dao.address,
      currentChain.deployments.DAO.abi,
      provider
    );

    let currentProposalCount = 1;
    let proposals = [];

    while (currentProposalCount) {
      try {
        const proposal = await DAO.proposals(currentProposalCount);

        if (proposal.proposer === ethers.constants.AddressZero) {
          break;
        }

        const proposalMetadata = await getProposalMetadata(proposal.ipfsHash);

        proposals.push({
          id: Number(proposal.id),
          proposer: proposal.proposer,
          endBlock: Number(proposal.endBlock),
          address: dao.address,
          metadata: proposalMetadata,
        });

        currentProposalCount++;
      } catch (err) {
        break;
      }
    }

    res.json({
      success: true,
      proposals,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const createNewProposal = async (req, res) => {
  try {
    const { chainId, address } = req.params;

    const { title, description } = req.body;

    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    const currentChain = config.chains.find(
      (chain) => chain.chainId === Number(chainId)
    );

    if (!currentChain) {
      throw new Error("Invalid chainId");
    }

    const dao = currentChain.DAOs.find((dao) => dao.address === address);

    if (!dao) {
      throw new Error("DAO not found");
    }

    const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);

    const DAO = new ethers.Contract(
      dao.address,
      currentChain.deployments.DAO.abi,
      provider
    );

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const proposal = {
      id: uuidv4(),
      title,
      description,
    };

    await uploadProposalMetadata(proposal);

    const unsignedTx = DAO.interface.encodeFunctionData("propose", [
      wallet.address,
      proposal.id,
    ]);

    const tx = await wallet.sendTransaction({
      to: dao.address,
      data: unsignedTx,
      value: 0,
      gasLimit: 2000000,
    });

    await tx.wait();

    const summary = await getSummary(title, description);

    req.body.chainId = chainId;
    req.body.cta = `/dao/${dao.address}/proposal/${proposal.id}`;
    req.body.summary = summary;

    await sendPushNotification(req, res);

    res.json({
      success: true,
      message: "Proposal created successfully",
      proposal,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getProposal,
  getAllProposals,
  createNewProposal,
};
