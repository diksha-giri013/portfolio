export const getWAString = (
	msg = `Hey there developer from ChipMonk Studios! Saw your services website. Would love to talk to you for a project. Drop me a message when you're free.`,
	number = '917678114688'
) => {
	// const number = '917678114688';

	// const msg_original = `Hey Aditya! Saw your developer portfolio. Would love to talk to you for a project. Drop me a message when you're free.`;
	return `https://api.whatsapp.com/send?phone=` + number + `&text=` + msg + '';
};
