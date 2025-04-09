import {AssistentSheet} from "@/modules/sofia/router";

const FloatingActionButton = ({}) => {
  return (
    <div className="fixed bottom-6 right-12 z-50">
      <AssistentSheet type="floating-button" initialMessage="" params={{}} />
    </div>
  );
};

export default FloatingActionButton;
