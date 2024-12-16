// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Library{
    address owner;
    uint private  bookSerial = 0;
    uint private  bookSerialtemp;
    uint private BorrowTime;
    uint lateFee;

    constructor(){
        owner = payable (msg.sender);
    }
    struct Details{
        uint bookSerial;  // increment of Books taken
        string studentId; 
        string studentName;
        string bookId; // bcz of same book having different book id
        string bookName;
        uint lateFee ; 
        uint BorrowTime; // recorded time for book taken
    }   mapping (string=>mapping(uint=>Details))getDetails;
        mapping  (string=>Details) getSerial;
   
    event Borrowed(string _id,string _name,string _bookId, string _bookName);
   

    function payFee(string memory _id,uint _bookSerial,uint _feeAmt) payable  public returns (uint)  {
            uint time = getDetails[_id][_bookSerial].BorrowTime;
            lateFee = calculateDays(block.timestamp + 86400 - time)*15; //What actually to be paid  later (15/1000)
            
            require(_feeAmt == lateFee,"Pay sufficient amount");
            getDetails[_id][_bookSerial].lateFee = 0;
            return(lateFee);
        }
    
       function Borrow(string memory _id,string memory _name,string memory _bookId,string memory _bookName) public{
            BorrowTime = block.timestamp;
            bookSerialtemp = getSerial[_id].bookSerial++;            
            getDetails[_id][bookSerialtemp] = Details(bookSerialtemp,_id,_name,_bookId,_bookName,lateFee,BorrowTime);
            emit Borrowed(_id, _name,_bookId, _bookName);
            
        }

        function GetDetails(string memory _id,uint _bookSerial)public   view returns(Details memory){    
        
           Details memory student = getDetails[_id][_bookSerial];
           
           return student;

        }
       

function BookCount (string memory _id) external  view returns (uint){
    uint count = getSerial[_id].bookSerial;
    return count;
}

  function calculateDays(uint256 secondsValue) internal  pure returns (uint256) {
    uint256 secondsInDay = 86400;
    uint256 daysValue = secondsValue / secondsInDay;
    return daysValue;
}
        function howMuchToPay(string memory _id,uint _bookSerial) internal view   returns (uint ){
             uint time = getDetails[_id][_bookSerial].BorrowTime;
            uint feeToPay = calculateDays(block.timestamp +86400  - time)*15;
            return (feeToPay);

        }
     

        function feeIncrement(string memory _id,uint _bookSerial) public  returns (uint){
            getDetails[_id][_bookSerial].lateFee =howMuchToPay(_id,_bookSerial);
             return (getDetails[_id][_bookSerial].lateFee);
            
        }


}
