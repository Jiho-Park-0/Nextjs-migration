"use client";

import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

const PrivacyPolicy = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Typography
        variant="small"
        className="p-1 font-light text-xs md:text-sm text-primary-100 cursor-pointer"
        onClick={handleOpen}
        placeholder=""
      >
        Policy
      </Typography>
      <Dialog
        open={open}
        handler={handleOpen}
        placeholder=""
        className="bg-primary-450"
      >
        <DialogHeader placeholder="" className="text-primary-100">
          Privacy Policy for Baslimbus.info
        </DialogHeader>
        <DialogBody
          placeholder=""
          className="bg-primary-450 overflow-y-auto h-96"
        >
          <div className="text-primary-100">
            <p className="text-lg font-bold">Effective Date: July 17, 2024</p>
            <br />
            <p>
              Welcome to baslimbus.info (the &quot;Site&quot;). This Privacy
              Policy describes how we collect, use, and protect your personal
              information when you visit our Site and use our services. By using
              the Site, you agree to the terms outlined in this Privacy Policy.
            </p>
            <br />
            <p className="text-lg font-bold">1. Information We Collect</p>
            <br />
            <p className="font-bold">1.1. Personal Information:</p>
            <p>
              We may collect personal information that you voluntarily provide
              to us when you register on the Site, subscribe to our newsletter,
              or contact us for support. This information may include:
            </p>
            <ul className="list-disc ml-5">
              <li>Name</li>
              <li>Email address</li>
              <li>Usernames</li>
              <li>Any other information you choose to provide</li>
            </ul>
            <br />
            <p className="font-bold">1.2. Non-Personal Information:</p>
            <p>
              We automatically collect non-personal information about your
              interactions with the Site. This information may include:
            </p>
            <ul className="list-disc ml-5">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages viewed and the time spent on each page</li>
              <li>Clickstream data</li>
            </ul>
            <br />
            <p className="text-lg font-bold">2. How We Use Your Information</p>
            <br />
            <p className="font-bold">
              2.1. To Provide and Improve Our Services:
            </p>
            <p>We use the information we collect to:</p>
            <ul className="list-disc ml-5">
              <li>Operate and maintain the Site</li>
              <li>Personalize your experience</li>
              <li>Improve the Site and our services</li>
              <li>Respond to your comments and questions</li>
              <li>Send you administrative and promotional communications</li>
            </ul>
            <br />
            <p className="font-bold">
              2.2. Marketing and Promotional Communications:
            </p>
            <p>
              With your consent, we may use your personal information to send
              you marketing and promotional communications. You can opt-out of
              these communications at any time by following the unsubscribe
              instructions provided in the email.
            </p>
            <br />
            <p className="font-bold">2.3. Compliance and Protection:</p>
            <p>
              We may use your information to comply with legal obligations,
              resolve disputes, and enforce our agreements.
            </p>
            <br />
            <p className="text-lg font-bold">
              3. Information Sharing and Disclosure
            </p>
            <br />
            <p className="font-bold">3.1. Third-Party Service Providers:</p>
            <p>
              We may share your information with third-party service providers
              who perform services on our behalf, such as hosting, data
              analysis, and email delivery.
            </p>
            <br />
            <p className="font-bold">3.2. Legal Requirements:</p>
            <p>
              We may disclose your information if required to do so by law or in
              response to valid requests by public authorities (e.g., a court or
              government agency).
            </p>
            <br />
            <p className="font-bold">3.3. Business Transfers:</p>
            <p>
              In the event of a merger, acquisition, or sale of all or a portion
              of our assets, your personal information may be transferred to the
              acquiring entity.
            </p>
            <br />
            <p className="text-lg font-bold">4. Security</p>
            <br />
            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access, use, and disclosure. However, no method
              of transmission over the internet or method of electronic storage
              is 100% secure.
            </p>
            <br />
            <p className="text-lg font-bold">5. Your Rights and Choices</p>
            <br />
            <p className="font-bold">
              5.1. Access and Update Your Information:
            </p>
            <p>
              You have the right to access and update your personal information.
              You can do this by logging into your account or contacting us
              directly.
            </p>
            <br />
            <p className="font-bold">5.2. Opt-Out of Communications:</p>
            <p>
              You can opt-out of receiving marketing and promotional
              communications from us by following the unsubscribe instructions
              provided in the emails.
            </p>
            <br />
            <p className="font-bold">5.3. Data Protection Rights:</p>
            <p>
              Depending on your location, you may have additional data
              protection rights. Please contact us to exercise these rights.
            </p>
            <br />
            <p className="text-lg font-bold">6. Children&apos;s Privacy</p>
            <br />
            <p>
              The Site is not intended for individuals under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you believe that we have collected personal information
              from a child under 13, please contact us, and we will take steps
              to delete such information.
            </p>
            <br />
            <p className="text-lg font-bold">
              7. Changes to This Privacy Policy
            </p>
            <br />
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page. You are advised to review this Privacy Policy
              periodically for any changes.
            </p>
            <br />
            <p className="text-lg font-bold">8. Contact Us</p>
            <br />
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
              <br />- Email: bas.limbus@gmail.com
            </p>
          </div>
        </DialogBody>
        <DialogFooter placeholder="">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 text-white"
            placeholder=""
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default PrivacyPolicy;
