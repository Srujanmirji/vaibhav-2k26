import Razorpay from 'razorpay';

const EVENT_FEES = {
    e1: { fee: 0 },
    e2: { fee: 100 },
    e3: { fee: 100 },
    e4: { fee: 100, groupFee: 100 },
    e5: { fee: 100, groupFee: 100 },
    e6: { fee: 100 },
    e7: { fee: 100 },
    e8: { fee: 100 },
    e9: { fee: 200 },
    e10: { fee: 0 },
    e11: { fee: 0 },
    e12: { fee: 0 },
    e13: { fee: 200 },
    e14: { fee: 100 },
    e15: { fee: 250 },
    e16: { fee: 100 },
    e17: { fee: 100 },
    e18: { fee: 200 },
    e19: { fee: 100 },
    e20: { fee: 100 },
    e21: { fee: 100, groupFee: 100 },
    e22: { fee: 0 },
    e23: { fee: 150, groupFee: 350 }, // Example: solo 150, group 350
    e24: { fee: 0 },
    e25: { fee: 150, groupFee: 350 }  // Example: solo 150, group 350
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const { selectedEventIds, currency, registrationType } = req.body;

        if (!Array.isArray(selectedEventIds) || selectedEventIds.length === 0) {
            return res.status(400).json({ success: false, error: 'No events selected.' });
        }

        let totalFee = 0;
        const validEvents = [];
        const isGroup = registrationType === 'Group';

        for (const eventId of selectedEventIds) {
            const eventConfig = EVENT_FEES[eventId];
            if (eventConfig !== undefined) {
                const appliedFee = (isGroup && eventConfig.groupFee !== undefined) ? eventConfig.groupFee : eventConfig.fee;
                totalFee += appliedFee;
                validEvents.push(eventId);
            }
        }

        if (totalFee <= 0 || validEvents.length === 0) {
            return res.status(400).json({ success: false, error: 'Invalid events or zero fee.' });
        }

        const order = await razorpay.orders.create({
            amount: totalFee * 100,
            currency: currency || 'INR',
            receipt: 'receipt_' + Date.now(),
        });

        return res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            calculatedFee: totalFee,
        });
    } catch (error) {
        console.error('Order Creation Error:', error);
        return res.status(500).json({ success: false, error: 'Failed to create order: ' + error.message });
    }
}
