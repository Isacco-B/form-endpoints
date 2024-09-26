import { CopyBlock, dracula } from "react-code-blocks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { languages } from "./constants";
import InfoBlock from "./components/InfoBlock";
import Form from "./assets/form.png";
import HtmlError from "./assets/html_error.png";
import HtmlSuccess from "./assets/html_success.png";
import JsonError from "./assets/json_error.png";
import JsonSuccess from "./assets/json_success.png";

export default function App() {
  return (
    <div className="max-w-6xl mx-auto mt-24">
      <div className=" text-center space-y-4">
        <h1 className="font-poppins font-bold text-neutral-700 dark:text-neutral-200 m-0 text-4xl md:text-5xl">
          Easy form endpoints for your HTML forms
        </h1>
        <p className="font-poppins font-normal text-neutral-500 dark:text-neutral-300 text-xl max-w-4xl mx-auto">
          Connect your form to our form endpoint and we’ll email you the
          submissions. No PHP, Javascript or any backend code required.
        </p>
      </div>
      <div className="mt-10">
        <Tabs defaultValue="html" className="space-y-4">
          <TabsList className="space-x-4 font-poppins">
            <TabsTrigger value="html">HTML Response (Page Reload)</TabsTrigger>
            <TabsTrigger value="json">
              JSON Response (No Page Reload)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="html">
            <Tabs defaultValue="html-form" className="space-y-4">
              <div className="text-center">
                <TabsList className="space-x-4 font-poppins">
                  <TabsTrigger value="html-form">Form</TabsTrigger>
                  <TabsTrigger value="html-style">Style</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="html-form">
                <CopyBlock
                  text={languages.html_form.html}
                  language={"html"}
                  showLineNumbers={true}
                  theme={dracula}
                />
              </TabsContent>
              <TabsContent value="html-style">
                <CopyBlock
                  text={languages.html_form.css}
                  language={"html"}
                  showLineNumbers={true}
                  theme={dracula}
                />
              </TabsContent>
            </Tabs>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-10">
              <div>
                <img
                  className="object-contain object-center w-full h-40 max-w-full rounded-lg"
                  src={Form}
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="object-contain object-center w-full h-40 max-w-full rounded-lg"
                  src={HtmlError}
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="object-contain object-center w-full h-40 max-w-full rounded-lg"
                  src={HtmlSuccess}
                  alt="gallery-photo"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="json">
            <Tabs defaultValue="json-form" className="space-y-4">
              <div className="text-center">
                <TabsList className="space-x-4 font-poppins">
                  <TabsTrigger value="json-form">Form</TabsTrigger>
                  <TabsTrigger value="json-style">Style</TabsTrigger>
                  <TabsTrigger value="json-javascript">Javascript</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="json-form">
                <CopyBlock
                  text={languages.json_form.html}
                  language={"html"}
                  showLineNumbers={true}
                  theme={dracula}
                />
              </TabsContent>
              <TabsContent value="json-style">
                <CopyBlock
                  text={languages.json_form.css}
                  language={"html"}
                  showLineNumbers={true}
                  theme={dracula}
                />
              </TabsContent>
              <TabsContent value="json-javascript">
                <CopyBlock
                  text={languages.json_form.javascript}
                  language={"javascript"}
                  showLineNumbers={true}
                  theme={dracula}
                />
              </TabsContent>
            </Tabs>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-10">
              <div>
                <img
                  className="object-contain object-center w-full h-40 max-w-full rounded-lg"
                  src={Form}
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="object-contain object-center w-full h-40 max-w-full rounded-lg"
                  src={JsonError}
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="object-contain object-center w-full h-40 max-w-full rounded-lg"
                  src={JsonSuccess}
                  alt="gallery-photo"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className=" text-center space-y-4 mt-24">
        <h1 className="font-poppins font-bold text-neutral-700 dark:text-neutral-200 m-0 text-3xl">
          Setup is easy and free.
        </h1>
        <p className="font-poppins font-normal text-neutral-500 dark:text-neutral-300 text-lg max-w-4xl mx-auto">
          Design a form for your site, and be sure to name all the fields. Then,
          just point the action to us and confirm your email address!
        </p>
        <div className="bg-neutral-800 dark:bg-neutral-300 dark:text-neutral-700 text-neutral-200 text-sm font-poppins font-semibold p-2 max-w-[250px] rounded-lg mx-auto">
          NO REGISTRATION REQUIRED
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-12  ">
        <InfoBlock
          title="1. CONNECT YOUR FORM"
          description="Pointing the action-attribute of your form to our URL will enable
            submissions to be sent to your email address."
          code={`<form id="contactForm" method="POST" action="https://demo13.isaccobertoli.com/your@email.com">`}
        />
        <InfoBlock
          title="2. ADD NAME ATTRIBUTES"
          description="Include a name attribute in all form elements to receive the
            submission data."
          code={`<input name="name" required/>
<input name="email" type="email" required/>
<input name="message" required/>`}
        />
        <InfoBlock
          title="3. SEND AND CONFIRM"
          description="Submit the form once. This first-time-use will trigger an email
            requesting confirmation."
        />
      </div>
      <div className=" text-center space-y-4 mt-24">
        <h1 className="font-poppins font-bold text-neutral-700 dark:text-neutral-200 m-0 text-3xl">
          FormEndpoints Advanced Features
        </h1>
        <p className="font-poppins font-normal text-neutral-500 dark:text-neutral-300 text-lg max-w-4xl mx-auto">
          Form inputs can have specially named name-attributes, which alter
          functionality. They are all prefixed with an underscore.
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-12  ">
        <InfoBlock
          title="_next (HTML Response)"
          description={`By default, after submitting a form the user is shown the FormEndpoints
            "Thank You" page. You can provide an alternative URL for "Thank You"
            page.`}
          code={`<input type="hidden" name="_next" value="https://yourdomain.com/thanks.html">`}
        />
        <InfoBlock
          title="_success"
          description="Use this to show a custom success message."
          code={`<input type="hidden" name="_success" value="Your success message">`}
        />
        <InfoBlock
          title="_error"
          description="Use this to show a custom error message."
          code={`<input type="hidden" name="_error" value="Your error message">`}
        />
      </div>
    </div>
  );
}
