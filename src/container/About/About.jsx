import { AppWrap, MotionWrap  } from '../../wrapper';
import { images } from '../../constants'
import './About.scss';

const About = () => {
  return (
    <div className="app__about">
      <div className="app__about-texts">
        <div className="column">
          <h2 className="header-texts">About Us</h2>
          <p className="mainTitle-text">No Rules, No Nothing</p>
          <p className="paragraph-text">In 2016, No Nothing emerged from the vibrant landscapes of southern California, its humble beginnings nestled in a small office space. Initially crafting mobile games, the studio's journey soon took a transformative turn towards the expansive realms of PC and diverse gaming consoles. No Nothing prides itself on shattering the conventional constraints of the contemporary gamescape, embracing a commitment to produce genre-bending marvels that transcend age boundaries. At the heart of our ethos lies a simple yet profound mantra – fun first. With every pixel, line of code, and imaginative leap, No Nothing strives to weave together interactive experiences that resonate across generations, inviting players to explore uncharted territories of enjoyment.</p>
        </div>
      </div>
      <div className="app__about-logo">
        <img className='img-logo' src={images.logoOutline} alt="Logo" />
      </div>
    </div>
  )
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__peachbg',
);