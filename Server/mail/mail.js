const nodemailer = require("nodemailer");

// Send Mail function using Nodemailer
const sendMail = () => {
	let mailTransporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
		user: "nency.faganiya@aloola.io",
		pass: "nency@2910"
		}
	});
	
	// Setting credentials
	let mailDetails = {
		from: "nency.faganiya@aloola.io",
		to: "dhruvtej.patel@aloola.io",
		subject: "Test mail using Cron job",
		text: "Node.js cron job email"
		
	};
	
	// Sending Email
	mailTransporter.sendMail(mailDetails,
					function(err, data) {
		if (err) {
			console.log("Error Occurs", err);
		} else {
			console.log("Email sent successfully");
		}
	});
}

module.exports = sendMail;