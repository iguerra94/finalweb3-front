package ar.edu.iua.model;

import java.util.Date;

public class CustomErrorDetails {
  private Date timestamp;
  private String message;
  private String path;

  public CustomErrorDetails(Date timestamp, String message, String path) {
      super();
      this.timestamp = timestamp;
      this.message = message;
      this.path = path;
  }

  public Date getTimestamp() {
      return timestamp;
  }

  public String getMessage() {
      return message;
  }

  public String getPath() {
      return path;
  }
}