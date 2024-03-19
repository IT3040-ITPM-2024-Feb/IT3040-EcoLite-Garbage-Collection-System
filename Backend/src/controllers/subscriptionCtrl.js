const mongoose = require("mongoose");
const User = require("../models/userModel");
const Sellar = require("../models/sellar.model");
const Company = require("../models/company.model");

//Subscribe A Company 
const subscribeToCompany = async (req, res) => {
    const { sellerId, companyId } = req.body;

    try {
        // Check if the seller is already subscribed to another company
        const seller = await Sellar.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ msg: "Seller not found", success: false });
        }

        // If the seller is already subscribed to a company, unsubscribe them
        if (seller.subscribedCompany) {
            const previousCompany = await Company.findById(seller.subscribedCompany);
            if (previousCompany) {
                previousCompany.subscribedSellersCount -= 1;
                previousCompany.subscribedSellers.pull(sellerId);
                await previousCompany.save();
            }
        }

        // Subscribe the seller to the new company
        seller.subscribedCompany = companyId;
        await seller.save();

        // Update the company's list of subscribed sellers and count
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ msg: "Company not found", success: false });
        }
        company.subscribedSellersCount += 1;
        company.subscribedSellers.push(sellerId);
        await company.save();

        res.json({ success: true, msg: "Seller subscribed to company successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", success: false });
    }
};

module.exports = {subscribeToCompany}