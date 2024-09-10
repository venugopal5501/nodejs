
// function year(a) {
    
//     const date = new Date(a);
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const date1 = new Date();
//     const year1 = date1.getFullYear();
//     const month1 = date1.getMonth();
//     const diff = year1 - year;
//     const diff1 = month1 - month;
//    return a;
// }

// module.exports = { year };

module.exports={
 
    datecalc(a)
      {
          // var a=document.getElementById("doj").innerHTML;
          // console.log(a);
         
          var df= new Date(a);
      var dt = new Date();  
      var allMonths= dt.getMonth() - df.getMonth() + (12 * (dt.getFullYear() -     df.getFullYear()));
      var allYears= dt.getFullYear() - df.getFullYear();
      var partialMonths = dt.getMonth() - df.getMonth();
      if (partialMonths < 0) {
      allYears--;
      partialMonths = partialMonths + 12;
      }
      var total = allYears + " yrs  " + partialMonths + " mon";
      var totalMonths = "A total of " + allMonths + " between the dates.";
      console.log(total);
  console.log(totalMonths);
  return total;
      }
  }