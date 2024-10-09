const Deal = require("../models/deals.model");

const CreateDeal = async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;

  try {
    const deal = new Deal({
      name,
      description,
      price,
      images,
      category,
      stock,
    });
    await deal.save();
    res.status(201).json(deal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const GetDeals = async (req, res) => {
  const { search, category, priceMin, priceMax, sortBy, order } = req.query;
  try {
    // Building the query object
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    // Set up sorting
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "desc" ? -1 : 1;
    }
    // Find deals
    const deals = await Deal.find(query).sort(sortOptions);
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const UpdateDeal = async (req, res) => {
  const id = req.params.id;
  try {
    const deal = await Deal.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      }
    );
    res.status(200).json(deal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const DeleleDeal = async (req, res) => {
  const id = req.params.id;
  try {
    const deal = await Deal.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Deal deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { CreateDeal, GetDeals, UpdateDeal, DeleleDeal };
