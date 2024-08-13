package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.openclassrooms.mddapi.dto.ArticleDto;
import com.openclassrooms.mddapi.models.Article;

/**
 * Mapper interface for converting between {@link Article} entities and {@link ArticleDto} data transfer objects.
 * Uses MapStruct to generate the implementation for mapping fields between the two types.
 */
@Mapper(componentModel = "spring")
public interface ArticleMapper {

    /**
     * The singleton instance of {@link ArticleMapper}.
     * <p>
     * This instance is used for mapping operations within the application.
     * </p>
     */
    ArticleMapper INSTANCE = Mappers.getMapper(ArticleMapper.class);

    /**
     * Converts an {@link Article} entity to an {@link ArticleDto} data transfer object.
     * <p>
     * The mapping configuration includes:
     * <ul>
     *     <li>Mapping the "theme.id" field of {@link Article} to the "themeId" field of {@link ArticleDto}.</li>
     *     <li>Mapping the "author.id" field of {@link Article} to the "authorId" field of {@link ArticleDto}.</li>
     * </ul>
     * </p>
     * 
     * @param article The {@link Article} entity to be converted.
     * @return The corresponding {@link ArticleDto} data transfer object.
     */
    @Mapping(source = "theme.id", target = "themeId")
    @Mapping(source = "author.id", target = "authorId")
    ArticleDto toDto(Article article);
}
