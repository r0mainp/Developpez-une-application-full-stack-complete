package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.response.UserResponse;

@Mapper(componentModel = "spring")
public interface UserResponseMapper {
    UserResponseMapper INSTANCE = Mappers.getMapper(UserResponseMapper.class);

    @Mapping(source = "displayUsername", target = "username")
    UserResponse toUserResponse(User user);
}
