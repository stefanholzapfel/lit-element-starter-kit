import {makeResolver} from 'ts-loader/dist/resolver';

export class SchedulerService {
    private static work: Work[] = [];
    private static nextFrameThreshold = 10;
    private static isActive = false;

    public static setThreshold(milliSeconds: number) {
        this.nextFrameThreshold = milliSeconds;
    }

    public static schedule(work: Work): void {
        if (!work.priority) {
            work.priority = 0;
        }
        const position = this.work.findIndex(_work => _work.priority >= work.priority);
        position <  0 ?
            this.work.unshift(work) :
            this.work.splice(position, 0, work);
        if (!this.isActive) {
            this.activate();
        }
    }

    public static activate() {
        this.isActive = true;
        requestAnimationFrame(() => {
            performance.mark('start');
            this.recursiveRunner();
            performance.clearMarks();
            performance.clearMeasures();
            if (this.work.length > 0) {
                this.activate();
            } else {
                this.isActive = false;
            }
        });
    }

    public static recursiveRunner() {
        performance.clearMeasures();
        performance.measure('timeRun', 'start');
        if (performance.getEntriesByName('timeRun')[0].duration <= this.nextFrameThreshold && this.work.length !== 0) {
            const nextWork = this.work.pop();
            if (!nextWork.abortController || !nextWork.abortController.signal.aborted) {
                nextWork.workCallback();
            }
            this.recursiveRunner();
        }
    }

}

export interface Work {
    workCallback: () => void;
    abortController?: AbortController;
    priority?: number;
    chunk?: boolean;
}
