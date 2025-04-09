import axios from "axios";
import { toast } from "sonner";
const ApiErrorService = {
  handleApiError: (error: any) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            toast.error("An Error found trying to retrieve information", {
              description: "It's look like a problem with the GET Protocol ",
              action: {
                label: "Try again",
                onClick: () => console.log("Undo"),
              },
            });
            break;
          case 500:
            toast.error("An Error found with the server", {
              description:
                "It's look like a problem about server communication",
              action: {
                label: "Try again",
                onClick: () => console.log("Undo"),
              },
            });
            break;
          default:
            toast.error("An Error found to load information", {
              description: "It's look like a runtime problem",
              action: {
                label: "Try again",
                onClick: () => console.log("Undo"),
              },
            });
        }
      } else if (error.request) {
        toast.error("An Error found with yout internet conection", {
          description: "Check your WiFi conection",
          action: {
            label: "Try again",
            onClick: () => console.log("Undo"),
          },
        });
      } else {
        toast.error("An Error found with the request", {
          description:
            "We are collecting error information. Please try again later",
          action: {
            label: "Ok",
            onClick: () => console.log("Undo"),
          },
        });
      }
    }
  },
};

export default ApiErrorService;