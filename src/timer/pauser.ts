import type { IPauseInfo } from "./timer.interface";

export class Pauser {
  private pauseInfo: IPauseInfo;

  constructor() {
    this.pauseInfo = { isPaused: false, resumedAt: Date.now() };
  }

  public isPaused() {
    return this.pauseInfo.isPaused;
  }

  public pausedAt() {
    if (!this.pauseInfo.isPaused) {
      throw new Error("Pauser.pausedAt() called when timer not paused");
    }
    return this.pauseInfo.pausedAt;
  }

  public pauseDuration() {
    if (!this.pauseInfo.isPaused) {
      throw new Error("Pauser.pauseDuration() called when timer not paused");
    }
    return Date.now() - this.pauseInfo.pausedAt;
  }

  public pause() {
    this.pauseInfo = {
      isPaused: true,
      pausedAt: Date.now(),
    };
  }

  public resume() {
    if (!this.pauseInfo.isPaused) {
      throw new Error("Pauser.resume() called when timer not paused");
    }

    const { pausedAt } = this.pauseInfo;
    const pauseDuration = this.pauseDuration();
    const resumedAt = Date.now();

    this.pauseInfo = {
      isPaused: false,
      resumedAt,
    };

    return {
      pausedAt,
      resumedAt,
      pauseDuration,
    };
  }
}
