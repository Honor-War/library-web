// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Library {
    address owner;
    uint256 private bookSerial = 0;
    uint256 private bookSerialtemp;
    uint256 private BorrowTime;
    uint256 lateFee = 1;
    bool fetchFee;
    bool feePaid;
    uint256 incrementTime;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Details {
        uint256 bookSerial; // increment of Books taken
        string studentId;
        string studentName;
        string bookId; // bcz of same book having different book id
        string bookName;
        uint256 lateFee;
        uint256 BorrowTime; // recorded time for book taken
        bool feePaid; // late fee paid or not
    }
    mapping(string => mapping(uint256 => Details)) getDetails;
    mapping(string => Details) getSerial;

    event Borrowed(string _id, string _name, string _bookId, string _bookName);

    function payFee(
        string memory _id,
        uint256 _bookSerial,
        uint256 _feeAmt
    ) public returns (uint256) {
        require(getDetails[_id][_bookSerial].feePaid == false, "Already Paid");
        require(
            incrementTime + 3600 > block.timestamp,
            "Times up, Fetch again and pay"
        );
        uint256 time = getDetails[_id][_bookSerial].BorrowTime;
        lateFee = calculateDays(block.timestamp + 86400 - time) * 15; //What actually to be paid  later (15/1000)

        require(_feeAmt == lateFee, "Pay sufficient amount");
        getDetails[_id][_bookSerial].feePaid = true;
        getDetails[_id][_bookSerial].lateFee = 0;

        return (lateFee);
    }

    function Borrow(
        string memory _id,
        string memory _name,
        string memory _bookId,
        string memory _bookName
    ) public {
        BorrowTime = block.timestamp;
        bookSerialtemp = getSerial[_id].bookSerial++;
        getDetails[_id][bookSerialtemp] = Details(
            bookSerialtemp,
            _id,
            _name,
            _bookId,
            _bookName,
            lateFee,
            BorrowTime,
            feePaid
        );
        emit Borrowed(_id, _name, _bookId, _bookName);
    }

    function GetDetails(string memory _id, uint256 _bookSerial)
        public
        view
        returns (Details memory)
    {
        Details memory student = getDetails[_id][_bookSerial];

        return student;
    }

    function BookCount(string memory _id) external view returns (uint256) {
        uint256 count = getSerial[_id].bookSerial;
        return count;
    }

    function calculateDays(uint256 secondsValue)
        internal
        pure
        returns (uint256)
    {
        uint256 secondsInDay = 86400;
        uint256 daysValue = secondsValue / secondsInDay;
        return daysValue;
    }

    function howMuchToPay(string memory _id, uint256 _bookSerial)
        internal
        view
        returns (uint256)
    {
        uint256 time = getDetails[_id][_bookSerial].BorrowTime;
        uint256 feeToPay = calculateDays(block.timestamp + 86400 - time) * 15;
        return (feeToPay);
    }

    function feeIncrement(string memory _id, uint256 _bookSerial)
        public
        returns (uint256)
    {
        getDetails[_id][_bookSerial].lateFee = howMuchToPay(_id, _bookSerial);

        incrementTime = block.timestamp;
        return (getDetails[_id][_bookSerial].lateFee);
    }
}
//  contract deployed at =  0x1973B3d7D9fc61C40b700DC209f8528C7cfd2312
