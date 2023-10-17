import {CustomerSatisfactionFeedback} from "../../compontents/Feedback/feedback";

export function Add_Feedback() {
    return (
        <div>
        <CustomerSatisfactionFeedback onComplete={function(): void {
                throw new Error("Function not implemented.");
            } } />
        </div>
    )}