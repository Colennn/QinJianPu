package cap.service.impl;

import java.util.List;

import cap.bean.SysCategory;
import cap.dao.SysCategoryDao;
import cap.dao.impl.SysCategoryDaoImpl;
import cap.service.SysCategoryService;
import cap.util.PageControl;

public class SysCategoryServiceImpl implements SysCategoryService {
	private SysCategoryDao scDao;

	public SysCategoryServiceImpl() {
		scDao=new SysCategoryDaoImpl();
	}
	
	@Override
	public List<SysCategory> getAllSysCategory(){
		return scDao.getAllSysCategory();
	}
	
	@Override
	public SysCategory getById(int id) {
		return scDao.getById(id);
	}
	
	@Override
	public int count(){
		return scDao.count();
	}
	
	@Override
	public PageControl getSysCategoryByPage(String curPageStr){
		PageControl pc = new PageControl(curPageStr, scDao.count());
		List<SysCategory> scgList=scDao.getSysCategoryByPage(pc.getCurPage(), pc.getPageSize());
		pc.setList(scgList);
		return pc;
	}
	
	@Override
	public SysCategory getByName(String scgName){
		return scDao.getByName(scgName);
	}
	
	@Override
	public int updateSysCategory(int scgId, String scgName){
		return scDao.updateSysCategory(scgId, scgName);
	}
	
	@Override
	public int insertSysCategory(String scgName){
		return scDao.insertSysCategory(scgName);
	}
	
	@Override
	public int deleteSysCategory(int scgId){
		return scDao.deleteSysCategory(scgId);
	}
	

}
