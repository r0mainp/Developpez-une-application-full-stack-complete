/**
 * Interface representing a theme.
 * 
 * The `Theme` interface defines the structure of a theme object, which includes details about
 * the theme such as its unique identifier, name, description, and optional timestamps for creation
 * and last update. This is used to categorize or group articles in the application.
 * 
 * @interface Theme
 * @property {number} id - The unique identifier of the theme. This field is required.
 * @property {string} name - The name of the theme. This field is required.
 * @property {string} description - A brief description of the theme. This field is required.
 * @property {Date} [createdAt] - The date and time when the theme was created. This field is optional.
 * @property {Date} [updatedAt] - The date and time when the theme was last updated. This field is optional.
 */
export interface Theme {
  id: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
