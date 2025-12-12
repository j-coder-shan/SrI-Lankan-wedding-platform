package com.booking.calendarservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT) // Returns 409
public class DateAlreadyBookedException extends RuntimeException {
    public DateAlreadyBookedException(String message) {
        super(message);
    }
}