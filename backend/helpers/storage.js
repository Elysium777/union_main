const axios = require("axios");

const API_BASE_URL = "https://akave.getbackend.tech";

const uploadDAOMetadata = async (chainId, name, metadata) => {
  try {
    // Add DAO Bucket name for the DAO
    const bucketID = process.env.DAO_ID;

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const file = new FormData();

    const blob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });

    file.append("file", blob, `${chainId}_${name}.json`);

    const res = await axios.post(
      `${API_BASE_URL}/buckets/${bucketID}/files`,
      file,
      { headers }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDAOMetadata = async (chainId, name) => {
  try {
    // Add DAO Bucket name for the DAO
    const bucketId = process.env.DAO_ID;

    const headers = {
      responseType: "blob",
    };

    const res = await axios.get(
      `${API_BASE_URL}/buckets/${bucketId}/files/${chainId}_${name}.json/download`,
      headers
    );

    return JSON.parse(res.data);
  } catch (error) {
    throw new Error(error.message);
  }
};

const uploadProposalMetadata = async (proposal) => {
  try {
    // Add Proposal Bucket name for the Proposal
    const bucketID = process.env.PROPOSAL_ID;

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const file = new FormData();

    const blob = new Blob([JSON.stringify(proposal)], {
      type: "application/json",
    });

    file.append("file", blob, `${proposal.id}.json`);

    const res = await axios.post(
      `${API_BASE_URL}/buckets/${bucketID}/files`,
      file,
      { headers }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProposalMetadata = async (proposalId) => {
  try {
    // Add Proposal Bucket name for the Proposal
    const bucketId = process.env.PROPOSAL_ID;

    const headers = {
      responseType: "json",
    };

    const res = await axios.get(
      `${API_BASE_URL}/buckets/${bucketId}/files/${proposalId.replaceAll(
        "-",
        "_"
      )}.json/download`,
      headers
    );

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const uploadUnionMetadata = async (chainId, proxyAddress, metadata) => {
  try {
    // Add Union Bucket name for the Union
    const bucketID = process.env.UNION_ID;

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const file = new FormData();

    const blob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });

    file.append("file", blob, `${chainId}_${proxyAddress}.json`);

    const res = await axios.post(
      `${API_BASE_URL}/buckets/${bucketID}/files`,
      file,
      { headers }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUnionMetadata = async (chainId, proxyAddress) => {
  try {
    // Add Union Bucket name for the Union
    const bucketId = process.env.UNION_ID;

    const headers = {
      responseType: "json",
    };

    const res = await axios.get(
      `${API_BASE_URL}/buckets/${bucketId}/files/${chainId}_${proxyAddress}.json/download`,
      headers
    );

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const listAllUnion = async (chainId) => {
  try {
    // Add Union Bucket name for the Union
    const bucketId = process.env.UNION_ID;

    const res = await axios.get(`${API_BASE_URL}/buckets/${bucketId}/files`);

    const filteredData = res.data.data.filter((data) => {
      return data.Name.split("_")[0] === chainId;
    });

    return filteredData;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getDAOMetadata,
  uploadProposalMetadata,
  getProposalMetadata,
  uploadUnionMetadata,
  getUnionMetadata,
  listAllUnion,
  uploadDAOMetadata,
};
