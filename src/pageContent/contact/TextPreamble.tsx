import React from "react";
import config from "../../config.json";

const TextPreamble: React.FC = () => (
  <>
    <p>
      Email{" "}
      <a href={"mailto:" + config.contact.email}>{config.contact.email}</a>.
      Find us on <a href={config.contact.facebook}>Facebook</a> and{" "}
      <a href={config.contact.instagram}>Instagram</a> as rstangerphotography.
      We'll respond fastest through Facebook but will endeavor to respond as
      fast as possible. If you can't find what you're looking for, feel free to
      contact us and we will be happy to discuss any of your individual
      requirements.
    </p>
  </>
);

export default TextPreamble;
