import React, {FC, PropsWithChildren, useState} from 'react';
import MaxWithLayout from "../layouts/MaxWithLayout";
import ButtonCustom from "../components/common/ButtonCustom";

const SeoSection: FC<PropsWithChildren<any>> = ({
                            seo
                        }) => {

    const [isShowMore, setIsShowMore] = useState<boolean>(false);

    const replaceText = (text: string) =>{
        if (isShowMore){
            return text
        }
        if (text?.length >= 300 ){
            return text?.slice(0, 300) + '...'
        }else {
            return text
        }
    }

    return (
        <MaxWithLayout>
            <div className="seo">
                <h4>
                    {
                        seo?.title
                    }
                </h4>
                <p>
                    <p dangerouslySetInnerHTML={{__html: replaceText(seo?.description) || ''}}/>
                </p>
                <ButtonCustom
                    onPress={() => setIsShowMore(!isShowMore)}
                    text={isShowMore ? 'Скрыть' : 'Показать больше'}
                    padding={'18px 30px'}
                />
            </div>

        </MaxWithLayout>
    );
};

export default SeoSection;
