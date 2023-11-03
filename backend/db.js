const mongoose=require('mongoose');
async function fetchData() {
    try {
      await mongoose.connect('mongodb://0.0.0.0:27017/foodDB');
      console.log("Connected");
  
      const fetched_data1 = mongoose.connection.db.collection("foodData");
      global.food_items = await fetched_data1.find({}).toArray();
      const fetched_data2 = mongoose.connection.db.collection("foodCategory");
      global.foodCategory = await fetched_data2.find({}).toArray();
    } catch (err) {
      console.error("Error:", err);
    }
  }

  module.exports=fetchData();