import { createClient, RedisClientType } from "redis";
import { REDIS_URI } from "../constants";

export class RedisManager {
  private static publisher: RedisClientType | null = null;
  private static subscriber: RedisClientType | null = null;

  private constructor() {}

  /**
   * Call this ONCE during application startup
   */
  public static async init(): Promise<void> {
    if (!RedisManager.publisher) {
      console.log(`REDIS_URI = ${REDIS_URI}`)
      RedisManager.publisher = createClient({
        url: REDIS_URI
      });
      await RedisManager.publisher.connect();
    }

    if (!RedisManager.subscriber) {
      RedisManager.subscriber = createClient({
        url: REDIS_URI
      });
      await RedisManager.subscriber.connect();
    }
  }

  /**
   * Synchronous getters, only safe after init()
   */
  public static getPublisher(): RedisClientType {
    if (!RedisManager.publisher) {
      throw new Error("RedisManager not initialized. Call RedisManager.init() first.");
    }
    return RedisManager.publisher;
  }

  public static getSubscriber(): RedisClientType {
    if (!RedisManager.subscriber) {
      throw new Error("RedisManager not initialized. Call RedisManager.init() first.");
    }
    return RedisManager.subscriber;
  }
}
