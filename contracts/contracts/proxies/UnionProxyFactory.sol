// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import "./UnionProxy.sol";

/**
 * @title Union Proxy Factory
 * @author Anoy Roy Chowdhury - <anoyroyc3545@gmail.com>
 * @notice Factory contract to create Union proxies
 */

contract UnionProxyFactory {
    // Event emitted when a new Union proxy is created
    event UnionProxyCreated(address unionProxy);

    /**
     * @notice Returns the creation code for the Union proxy
     * @return The creation code for the Union proxy
     */
    function proxyCreationCode() public pure returns (bytes memory) {
        return type(UnionProxy).creationCode;
    }

    /**
     * @notice Deploys a Union proxy contract using CREATE2
     * @param _singleton  The address of the singleton contract
     * @param initializer  The initialization code for the proxy
     * @param salt  The salt for the proxy deployment
     */
    function deployProxy(
        address _singleton,
        bytes memory initializer,
        bytes32 salt
    ) internal returns (UnionProxy proxy) {
        require(isContract(_singleton), "Singleton contract not deployed");

        bytes memory deploymentData = abi.encodePacked(
            type(UnionProxy).creationCode,
            uint256(uint160(_singleton))
        );

        assembly {
            proxy := create2(
                0x0,
                add(0x20, deploymentData),
                mload(deploymentData),
                salt
            )
        }
        /* solhint-enable no-inline-assembly */
        require(address(proxy) != address(0), "Create2 call failed");

        if (initializer.length > 0) {
            assembly {
                if eq(
                    call(
                        gas(),
                        proxy,
                        0,
                        add(initializer, 0x20),
                        mload(initializer),
                        0,
                        0
                    ),
                    0
                ) {
                    revert(0, 0)
                }
            }
        }
    }

    /**
     * @notice Creates a Union proxy contract
     * @param _singleton  The address of the singleton contract
     * @param initializer  The initialization code for the proxy
     * @param saltNonce  The nonce for the proxy deployment
     */
    function createProxyWithNonce(
        address _singleton,
        bytes memory initializer,
        uint256 saltNonce
    ) public returns (UnionProxy proxy) {
        bytes32 salt = keccak256(
            abi.encodePacked(keccak256(initializer), saltNonce)
        );
        proxy = deployProxy(_singleton, initializer, salt);
        emit UnionProxyCreated(address(proxy));
    }

    /**
     * @notice Returns true if `account` is a contract.
     * @dev This function will return false if invoked during the constructor of a contract,
     *      as the code is not actually created until after the constructor finishes.
     * @param account The address being queried
     * @return True if `account` is a contract
     */
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            size := extcodesize(account)
        }
        /* solhint-enable no-inline-assembly */
        return size > 0;
    }
}
