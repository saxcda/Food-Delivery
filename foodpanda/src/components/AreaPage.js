import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer'

const AreaPage = () => {
  const { areaName } = useParams(); // 从路由参数中获取区域名称

  const cityContent = {
    台北市: {
        popularAreas: [
          'Beitou', 
          'Daan',
          'Dadaocheng',
          'Datong',
          'East',
          'Nangang',
          'Neihu',
          'Shilin',
          'Songshan',
          'Wanhua',
          'Ximending',
          'Xinyi'
        ],
        otherAreas: ['Wenshan']
      },
      新北市: {
        popularAreas: [
          'Banqiao',
          'Danshui',
          'Sanxia',
          'Tucheng',
          'Xindian',
          'Xizhi',
          'Yonhe',
          'Zhonghe'
        ]
      },
      苗栗縣: {
        popularAreas: [
          'Miaoli City'
        ]
      },
      南投縣: {
        popularAreas: [
          'Zhushan'
        ]
      },
      桃園市: {
        popularAreas: [
          'Longtan',
          'Zhongli'
        ]
      },
      雲林縣: {
        popularAreas: [
          'Douliu City'
        ]
      },
      臺東縣: {
        popularAreas: [
          'Taitung City'
        ]
      },
      臺南市: {
        popularAreas: [
          'Annan',
          'Anping',
          'East',
          'North',
          'South',
          'West Central'
        ]
      },
      臺中市: {
        popularAreas: [
          'Beitun',
          'Dadu',
          'Dajia',
          'Dali',
          'Fengyuan',
          'Nantun',
          'Qingshui',
          'Taiping',
          'West',
          'Xitun'
        ]
      },
      高雄市: {
        popularAreas: [
          'Fongshan',
          'Gushan',
          'Qianzhen',
          'Xiaogang',
          'Yancheng',
          'Zuoying'
        ]
      }
      
    // 更多城市信息
  };

  const cityInfo = cityContent[areaName] || { popularAreas: [], otherAreas: [], deliveryInfo: [], popularRestaurants: [] };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <img
          src="https://images.deliveryhero.io/image/foodpanda/cms-hero.jpg"
          alt="Area Page Hero"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>

      {/* 熱門區域 */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
        {areaName}熱門區域
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '10px' }}>
          {cityInfo.popularAreas.map((area, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                minWidth: '100px',
                textAlign: 'center'
              }}
            >
              {area}
            </div>
          ))}
        </div>
      </div>

      {/* 其他區域 */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
        {areaName}其他區域
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '10px' }}>
          {cityInfo.otherAreas.map((area, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                minWidth: '100px',
                textAlign: 'center'
              }}
            >
              {area}
            </div>
          ))}
        </div>
      </div>

      {/* 美食外送資訊 */}
      {/* <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
          美食外送資訊
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {cityInfo.deliveryInfo.map((info, index) => (
            <div
              key={index}
              style={{
                flex: '1 1 30%',
                padding: '10px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              {info}
            </div>
          ))}
        </div>
      </div> */}

      {/* 熱門餐廳 */}
      {/* <div>
        <h2 style={{ fontSize: '20px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
          熱門餐廳
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '10px' }}>
          {cityInfo.popularRestaurants.map((restaurant, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                minWidth: '120px',
                textAlign: 'center'
              }}
            >
              {restaurant}
            </div>
          ))}
        </div>
      </div> */}
    
        <Footer />

    </div>
  );
};

export default AreaPage;
