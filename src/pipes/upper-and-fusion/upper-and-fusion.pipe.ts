import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === "body") {
      return value.data
        .map((el) =>
          el.toUpperCase()
        )
        .join("-");
    }
    console.log(metadata, value);
    return value;
  }
}
