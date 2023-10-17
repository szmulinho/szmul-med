import {DeleteDrug} from "../../compontents/Drugs/Delete/DeleteDrug";

export function Delete_drug() {
    return (
        <div>
            <DeleteDrug onDelete={function(): void {
                throw new Error("Function not implemented.");
            } } />
        </div>
    )}