const { getDAOMetadata, uploadDAOMetadata } = require("../helpers/storage");
const config = require("../lib/config");

const uploadDAO = async (req, res) => {
  try {
    const { chainId, name, metadata } = req.body;

    const currentChain = config.chains.find(
      (chain) => chain.chainId === Number(chainId)
    );

    if (!currentChain) {
      throw new Error("Invalid chainId");
    }

    await uploadDAOMetadata(currentChain.chainId, name, metadata);

    res.json({
      success: true,
      message: "DAO metadata uploaded successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const getDAO = async (req, res) => {
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

    const DAOmetadata = await getDAOMetadata(currentChain.chainId, dao.name);

    res.json({
      success: true,
      metadata: DAOmetadata,
      address: dao.address,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const getAllDao = async (req, res) => {
  try {
    const { chainId } = req.params;

    const currentChain = config.chains.find(
      (chain) => chain.chainId === Number(chainId)
    );

    if (!currentChain) {
      throw new Error("Invalid chainId");
    }

    const DAOs = currentChain.DAOs.map((dao) => ({
      name: dao.name,
      address: dao.address,
    }));

    res.json({
      success: true,
      DAOs,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDAO,
  getAllDao,
  uploadDAO,
};
