package com.hust.zaloclonebackend.config.session;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.util.concurrent.TimeUnit;

@Slf4j
public final class RedisSerializationBuilder {

    public static <T> RedisTemplate<String, T> getSnappyRedisTemplate(
            final LettuceConnectionFactory factory,
            final Class<T> clazz
    ) {
        SnappyMsgPackRedisSerializer<T> snappyMsgPackSerializer = new SnappyMsgPackRedisSerializer<>(clazz);
        RedisTemplate<String, T> redisTemplate = new RedisTemplate<>();

        redisTemplate.setConnectionFactory(factory);
        redisTemplate.setDefaultSerializer(snappyMsgPackSerializer);

        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(snappyMsgPackSerializer);

        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(snappyMsgPackSerializer);
        redisTemplate.afterPropertiesSet();

        return redisTemplate;
    }

    public static <T> RedisTemplate<String, T> getDefaultRedisTemplate(final LettuceConnectionFactory factory) {
        log.info("getDefaultRedisTemplate factory {}", factory);

        RedisTemplate<String, T> redisTemplate = new RedisTemplate<>();

        RedisSerializer<?> serializer = new StringRedisSerializer();
        RedisSerializer<?> hashKeySerializer = new StringRedisSerializer();
//        log.info("serializer {}", serializer);
//        log.info("hashKeySerializer {}", hashKeySerializer);
        redisTemplate.setConnectionFactory(factory);
        redisTemplate.setKeySerializer(serializer);
        redisTemplate.setHashKeySerializer(hashKeySerializer);
        redisTemplate.afterPropertiesSet();

//        redisTemplate.opsForHash().put("UniqueKey","HttpBin.Org","response_to_cache");
//        redisTemplate.expire("UniqueKey",60, TimeUnit.HOURS);
        return redisTemplate;
    }
}
