import { Button } from "@/components/ui/button";

export default function PaginationBar() {
    return(
        <main className="mt-5 ml-10">
            <div className="flex items-center justify-center h-screen gap-4">
                <Button variant="outline">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
            </div>
        </main>
    );
}