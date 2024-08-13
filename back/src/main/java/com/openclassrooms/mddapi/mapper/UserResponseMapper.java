package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.response.UserResponse;

/**
 * Mapper interface for converting between {@link User} entities and {@link UserResponse} response objects.
 * Uses MapStruct to generate the implementation for mapping fields between the two types.
 */
@Mapper(componentModel = "spring")
public interface UserResponseMapper {

    /**
     * The singleton instance of {@link UserResponseMapper}.
     * <p>
     * This instance is used for mapping operations within the application.
     * </p>
     */
    UserResponseMapper INSTANCE = Mappers.getMapper(UserResponseMapper.class);

    /**
     * Converts a {@link User} entity to a {@link UserResponse} response object.
     * <p>
     * The mapping configuration includes:
     * <ul>
     *     <li>Mapping the "displayUsername" field of {@link User} to the "username" field of {@link UserResponse}.</li>
     * </ul>
     * </p>
     * 
     * @param user The {@link User} entity to be converted.
     * @return The corresponding {@link UserResponse} response object.
     */
    @Mapping(source = "displayUsername", target = "username")
    UserResponse toUserResponse(User user);
}
