import { PickType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";

export class ProductSummaryDto extends PickType(
    CreateProductDto,
    [
        'images',
        'productName',
        'price'
    ] as const
){}