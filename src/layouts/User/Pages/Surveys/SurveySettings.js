import Loading from "components/Common/Loading";
import SurveySettingsMain from "components/Survey/SurveySettingsMain";
import * as React from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import { Button, Card, CardHeader, Row } from "reactstrap";

const SurveySettings = () => {
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    setLoading(true);


    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false)
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "SurveySettings",
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: false,
  });

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  return (
    <div className="content">
      {loading && <Loading />}
      <div className="content" ref={componentRef}>
        <Card>
          <CardHeader className="row justify-content-between no-gutters">
            <h2>Survey Settings</h2>

            <Row className="align-items-center">
              <p>Download as PDF</p>
              <Button
                onClick={handlePrint}
                color="success"
                className="btn-icon btn-round mx-2"
              >
                <IoCloudDownloadOutline size={24} />
              </Button>
            </Row>
          </CardHeader>
          <SurveySettingsMain />
        </Card>
      </div>
    </div>
  );
};

export default SurveySettings;
