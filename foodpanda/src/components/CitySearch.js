import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CitySearch.css'; // 样式文件

const CitySearch = ({ location }) => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const navigate = useNavigate();

  const cityData = {
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

  // 初始化区域列表和默认选中区域
  useEffect(() => {
    if (cityData[location]?.popularAreas) {
      const popularAreas = cityData[location].popularAreas;
      setAreas(popularAreas);
      setSelectedArea(''); // 默认选中第一个区域，如果不存在则为空
    } else {
      setAreas([]);
      setSelectedArea(''); // 重置选中区域
    }
    console.log(areas); // 注意：`areas` 的更新是异步的，这里可能不会立即显示更新后的值
  }, [location]);
  

  const handleSelectArea = (event) => {
    setSelectedArea(event.target.value);
  };

  const handleGoToTownPage = (town) => {
    if (town) {
      navigate(`/area/${location}/${town}`); // 跳转到对应区域页面
    } else {
      console.log('請選擇區域！');
    }
  };

  const handleGoToAreaPage = () => {
    navigate(`/area/${location}`); // 跳转到对应区域页面
  };

   return (
    <div className="city-search-container">
      
      {areas.length > 0 ? (
        <div className="city-search-controls">
        <h2 className="city-search-title">
        {location ? `${location}熱門區域` : '請選擇城市'}
        </h2>
          {/* 下拉菜单选择区域 */}
          <select
            className="city-search-select"
            value={selectedArea}
            onChange={(event) => {
                const selectedValue = event.target.value; // 获取用户选择的值
                setSelectedArea(selectedValue); // 更新状态
                handleGoToTownPage(selectedValue); // 使用选择的值直接跳转
            }}
            >
            {/* 默认占位选项 */}
            <option value="" disabled>
                Select an area
            </option>
            {areas.map((area, index) => (
                <option key={index} value={area}>
                {area}
                </option>
            ))}
            </select>




          {/* 跳转按钮 */}
          <button className="city-search-button" onClick={handleGoToAreaPage}>
            See All Areas
          </button>
        </div>
      ) : (
        <p className="city-search-error"></p>
      )}
    </div>
  );
};

export default CitySearch;
