const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp"),
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6685a4bae60de03c788aa606",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. In asperiores alias laudantium molestiae labore, suscipit officiis, dolore necessitatibus rerum, adipisci deserunt cum dolorum quae optio. Quis incidunt sapiente aperiam rerum?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/darzagqy2/image/upload/v1720175174/YelpCamp/rlmkm8dm0f46ojspk8oh.png",
          filename: "YelpCamp/rlmkm8dm0f46ojspk8oh",
        },
        {
          url: "https://res.cloudinary.com/darzagqy2/image/upload/v1720175179/YelpCamp/dmcrweo7bhfsu3gc6tez.png",
          filename: "YelpCamp/dmcrweo7bhfsu3gc6tez",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
