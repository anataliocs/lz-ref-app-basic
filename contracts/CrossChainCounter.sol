// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma abicoder v2;

import "../contracts/LzBaseApp.sol";

/// @title OmniCounter
/// @author Chris Anatalio
/// @notice A LayerZero example sending a cross chain message from a source chain to a destination chain to increment a counter on the destination chain
contract CrossChainCounter is LzBaseApp {
    bytes public constant PAYLOAD = "\x01\x02\x03\x04";
    uint public counter;

    constructor(address _lzEndpoint) LzBaseApp(_lzEndpoint) {}

    ///@notice Overrides _nonblockingLzReceive() and is called on the destination chain when receiving a message and increments the counter
    // @param _srcChainId - the source endpoint identifier
    // @param _srcAddress - the source sending contract address from the source chain
    // @param _nonce - the ordered message nonce
    // @param _payload - the signed payload is the UA bytes has encoded to be sent
    function _blockingLzReceive(uint16, bytes memory, uint64, bytes memory) internal override {
        counter += 1;
    }

    ///@notice
    function estimateFee(uint16 _dstChainId, bool _useZro, bytes calldata _adapterParams) public view returns (uint nativeFee, uint zroFee) {
        return lzEndpoint.estimateFees(_dstChainId, address(this), PAYLOAD, _useZro, _adapterParams);
    }

    function incrementCounter(uint16 _dstChainId) public payable {
        _lzSend(_dstChainId, PAYLOAD, payable(msg.sender), address(0xF761d0581103FBD226F299Da8dc70FdE3Bd00B89), bytes("0x"), msg.value);
    }

    function setOracle(uint16 dstChainId, address oracle) external onlyOwner {
        uint TYPE_ORACLE = 6;
        // set the Oracle
        lzEndpoint.setConfig(lzEndpoint.getSendVersion(address(this)), dstChainId, TYPE_ORACLE, abi.encode(oracle));
    }

    function getOracle(uint16 remoteChainId) external view returns (address _oracle) {
        bytes memory bytesOracle = lzEndpoint.getConfig(lzEndpoint.getSendVersion(address(this)), remoteChainId, address(this), 6);
        assembly {
            _oracle := mload(add(bytesOracle, 32))
        }
    }
}