package com.presents;

public class JsonValue<T> {
    private T value;

    public JsonValue() {
    }

    public JsonValue(T value) {
        this.value = value;
    }

    public static <T> JsonValue<T> from(T value) {
        return new JsonValue(value);
    }

    public static <T> JsonValue<T> of(T value) {
        return new JsonValue(value);
    }

    public static JsonValue<Boolean> ifNull(Object value) {
        return new JsonValue(value == null);
    }

    public static JsonValue<Boolean> ifNotNull(Object value) {
        return new JsonValue(value != null);
    }

    public T getValue() {
        return this.value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}