const calculateNextBillingDate=()=>{
    // const oneMonth=new Date();
    // oneMonthFromNow.setMonth(oneMonth.getMonth()+1);
    // return oneMonthFromNow;
    const today=new Date();
    today.setMonth(today.getMonth()+1);
}
module.exports=calculateNextBillingDate;