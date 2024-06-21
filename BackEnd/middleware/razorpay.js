
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_F5C5ccjn0fIRNK',
  key_secret: 'NqtCuTmW7DJZJJHf2gHvgLE1',
});

const createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: amount,
      currency: currency,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const handleWebhook = async (req, res) => {
  const body = req.body.toString();

  try {
    const signature = req.header('x-razorpay-signature');
    const isValidSignature = razorpay.webhooks.validate(body, signature, 'YOUR_RAZORPAY_WEBHOOK_SECRET');

    if (isValidSignature) {
      const payment = JSON.parse(body);
      console.log('Payment successful:', payment);
      // Handle payment success logic here (e.g., update database, send confirmation emails)
      res.status(200).end();
    } else {
      console.error('Invalid webhook signature');
      res.status(400).end();
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
};

module.exports = {
  createOrder,
  handleWebhook,
};
