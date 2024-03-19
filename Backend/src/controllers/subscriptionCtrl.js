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

//Unsubscribe A Company by Sellar
const unsubscribeFromCompany = async (req, res) => {
    const { sellerId, companyId } = req.body;

    try {
        // Check if the seller is subscribed to the company
        const seller = await Sellar.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ msg: "Seller not found", success: false });
        }

        if (seller.subscribedCompany.toString() !== companyId) {
            return res.status(400).json({ msg: "Seller is not subscribed to this company", success: false });
        }

        // Unsubscribe the seller from the company
        const company = await Company.findById(companyId);
        if (company) {
            company.subscribedSellersCount -= 1;
            company.subscribedSellers.pull(sellerId);
            await company.save();
        }

        seller.subscribedCompany = null;
        await seller.save();

        res.json({ success: true, msg: "Seller unsubscribed from company successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", success: false });
    }
};

//Get Subscribed Unique Sellars for A Company
const fetchSubscribedSellersDetails = async (req, res) => {
    const companyId = req.params.companyId;
    try {
        // Fetch the company details with subscribed sellers from the database
        const company = await Company.findById(companyId).populate('subscribedSellers');
        if (!company) {
            return res.status(404).json({ success: false, msg: 'Company not found' });
        }

        // Extract seller details from subscribedSellers array
        const subscribedSellers = company.subscribedSellers.map(seller => ({
            _id: seller._id,
            firstName: seller.firstName,
            lastName: seller.lastName,
            phone: seller.phone,
            address: seller.address
            // Add more seller details as needed
        }));

        // Return subscribed sellers' details
        res.json({ success: true, subscribedSellers });
    } catch (error) {
        console.error('Error fetching subscribed sellers:', error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = {subscribeToCompany,unsubscribeFromCompany,fetchSubscribedSellersDetails}