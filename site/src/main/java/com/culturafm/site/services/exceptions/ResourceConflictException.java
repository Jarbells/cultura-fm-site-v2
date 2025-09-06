package com.culturafm.site.services.exceptions;

public class ResourceConflictException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ResourceConflictException(String msg) {
        super(msg);
    }
}
