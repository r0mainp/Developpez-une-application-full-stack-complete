package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.models.Article;

@Mapper(componentModel = "spring")
public interface ArticleMapper {

    ArticleMapper INSTANCE = Mappers.getMapper(ArticleMapper.class);

    @Mapping(source = "theme.id", target = "themeId")
    @Mapping(source = "author.id", target = "authorId")
    ArticleDto toDto(Article article);

    @Mapping(source = "themeId", target = "theme.id")
    @Mapping(source = "authorId", target = "author.id")
    Article toEntity(ArticleDto articleDto);
}
