<template>
    <div>
        <h1 class="text-center">RWD Test</h1>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="list-group d-none d-md-block">
                        <a href="#" class="list-group-item list-group-item-action active">
                            Cras justo odio
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                        <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
                        <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                        <a href="#" class="list-group-item list-group-item-action disabled" tabindex="-1" aria-disabled="true">Vestibulum at eros</a>
                    </div>  
                    <div class="form-group d-md-none">
                        <label for="exampleFormControlSelect1">Example select</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div> 
                        
                </div>                
                <div class="col-md-8">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>星期一</th>
                                <th>星期二</th>
                                <th>星期三</th>
                                <th>星期四</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>吃飯</td>
                                <td>睡覺</td>
                                <td>洗澡</td>
                                <td>打東東</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scope>
    .shortSelect{
        width: 200px;
    }
</style>