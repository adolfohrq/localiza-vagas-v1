import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InterviewFeedbackGrid } from "@/components/interview-feedback-grid"

export function AllFeedbacksDialog() {
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Todos os Feedbacks</DialogTitle>
          <DialogDescription>Visualize todos os feedbacks de suas entrevistas.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <InterviewFeedbackGrid />
        </ScrollArea>
        <div className="mt-6 flex justify-end">
          <Button type="button" onClick={() => window.allFeedbacks.close()}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

