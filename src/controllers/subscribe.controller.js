import Subscribe from "../database/models/subscribe.model";
import sendEmail from "../utils/sendMail";

export const createSubscribe = async (req, res) => {
    const { email,names } = req.body;
    try {
        const newSubscribe = await Subscribe.create({ email,names });
        await sendEmail({
            to: email,
            subject: "Posinnove Newsletter Subscription",
            body: `
              <html>
                <head>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                    }
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                    }
                    .unsubscribe-link {
                      color: #007bff;
                      text-decoration: none;
                    }
                    .unsubscribe-link:hover {
                      text-decoration: underline;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h2>Welcome to Posinnove Newsletter</h2>
                    <p>Dear ${newSubscribe.names},</p>
                    <p>Thank you for subscribing to our newsletter. You'll now receive updates on our latest news and offers.</p>
                    <p>If you wish to unsubscribe in the future, please click the following link:</p>
                    <p><a class="unsubscribe-link" href=${process.env.baseURL}/api/subscribe/${newSubscribe.id}>Unsubscribe</a></p>
                  </div>
                </body>
              </html>
            `,
        });
        return res.status(201).json({
            status: "success",
            message: "Subscription created successfully",
            data: {
                subscribe: newSubscribe,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const unSubscribe = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSubscribe = await Subscribe.destroy({ where: { id } });
        return res.status(200).json({
            status: "success",
            message: "Subscription cancelled successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const sendBlogPostPublishedEmail = async (req, res) => {
    try {
        const { title, summary, postId } = req.body; 

        const subscribers = await Subscribe.findAll();

        if (subscribers.length > 0) {
            for (const subscriber of subscribers) {
                await sendEmail({
                    to: subscriber.email,
                    subject: "New Blog Post Published",
                    body: `
                        <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                    }
                                    .container {
                                        max-width: 600px;
                                        margin: 0 auto;
                                        padding: 20px;
                                    }
                                    .post-link {
                                        color: #007bff;
                                        text-decoration: none;
                                    }
                                    .post-link:hover {
                                        text-decoration: underline;
                                    }
                                    .unsubscribe-link {
                                        color: #6c757d;
                                        font-size: 12px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <h2>New Blog Post: ${title}</h2>
                                    <p>${summary}</p>
                                    <p><a class="post-link" href="${process.env.baseURL}/blog/${postId}">Read More</a></p>
                                    <p class="unsubscribe-link">
                                        <a href="${process.env.baseURL}/api/subscribe/unsubscribe/${subscriber.id}">Unsubscribe</a>
                                    </p>
                                </div>
                            </body>
                        </html>
                    `,
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Blog post notification emails sent successfully",
            });
        } else {
            return res.status(200).json({
                status: "success",
                message: "No subscribers to notify",
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Failed to send blog post notification emails",
            error: error.message,
        });
    }
};