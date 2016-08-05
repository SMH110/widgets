declare module "zurvan" {
    function releaseTimers(): Promise<void>;
    function interceptTimers(): Promise<void>;
    function waitForEmptyQueue(): Promise<void>;
}