// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

interface IFtsoV2FeedConsumer {
    /// @notice Gets the FLR/USD price feed data
    /// @return feedValue The current feed value
    /// @return decimals The number of decimals in the feed value
    /// @return timestamp The timestamp of the last update
    function getFlrUsdPrice() external view returns (uint256, int8, uint64);

    /// @notice Gets price feed data for a specific feed ID
    /// @param feedId The ID of the feed to query
    /// @return feedValue The current feed value
    /// @return decimals The number of decimals in the feed value
    /// @return timestamp The timestamp of the last update
    function getFeedPrice(
        bytes21 feedId
    ) external view returns (uint256, int8, uint64);

    /// @notice Gets price feed data for a feed by its name
    /// @param feedName The name of the feed to query
    /// @return feedValue The current feed value
    /// @return decimals The number of decimals in the feed value
    /// @return timestamp The timestamp of the last update
    function getFeedPriceByName(
        string memory feedName
    ) external view returns (uint256, int8, uint64);

    /// @notice Returns all available price feed IDs
    /// @return Array of feed IDs
    function getAvailablePriceFeeds() external view returns (bytes21[] memory);

    /// @notice Returns human readable names of all available price feeds
    /// @return feedNames Array of feed names
    function getAvailablePriceFeedNames()
        external
        view
        returns (string[] memory feedNames);
}
