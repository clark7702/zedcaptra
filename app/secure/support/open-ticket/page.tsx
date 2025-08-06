import ContactFormComponent from "../../../../components/contact-us/ContactForm";
import { getUser } from "../../../../lib/actions";

async function ContactUs() {
  const user = await getUser();

  if (!user) return null;

  return (
    <div className="sm:w-3/4 my-12 mx-4 sm:mx-auto lg:w-1/2">
      <ContactFormComponent user={user} />
    </div>
  );
}

export default ContactUs;
