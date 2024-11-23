import React, { FC } from 'react';
import { CustomLink } from '@/@core/tag/CustomLink';
import Image from 'next/image';
import SocialIcons from '@/components/action/SocialIcons/SocialIcons';
import Screen from '@/utils/overlayer';
import { DataType, FooterDataType } from '@/utils/contents/footerList';
import Card from '@/@core/tag/Card';

interface Props {
  logoIcon?: string;
  logoAlt?: string;
  title?: string;
  description?: string;
  data?: FooterDataType[];
  idName?: string;
}
const Footer: FC<Props> = ({
  logoIcon = '',
  logoAlt = '',
  title = 'Logo',
  description = 'Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.',
  data = [],
  idName = 'name',
}) => {
  return (
    <Card className=" p-2 md:p-6 ">
      <Screen>
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
          <div className="md:col-span-4 col-span-12">
            <div className="space-y-8">
              {logoIcon && (
                <Image src={logoIcon} alt={logoAlt} height={300} width={300} />
              )}
              {title && (
                <h1 className="hidden md:block text-3xl text-primary">
                  {title}
                </h1>
              )}
              <p className="font-light">{description}</p>
              <SocialIcons />
            </div>
          </div>
          <div className="md:col-span-8 col-span-12">
            <div className="w-full">
              <div className="grid grid-cols-12 space-y-8 md:space-y-0">
                {data.map((item: FooterDataType, i) =>
                  Object.entries(item).map(
                    ([item, value]: [item: string, value: DataType[]], i) => (
                      <div
                        key={i}
                        className="md:col-span-4 col-span-12 md:justify-self-end"
                      >
                        <div className="space-y-8">
                          <h2 className="text-muted-foreground text-xl font-bold">
                            {item}
                          </h2>
                          <div className="space-y-4">
                            {value.map((item: any, i: number) => (
                              <div key={i} className="space-y-2">
                                <CustomLink href={item.link}>
                                  <div className="text-muted-foreground hover:text-primary Transition cursor-pointer">
                                    {item[idName]}
                                  </div>
                                </CustomLink>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </Screen>
    </Card>
  );
};

export default Footer;
